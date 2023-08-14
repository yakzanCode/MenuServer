const { dbConnect } = require('../config/dbConnect');

async function getAllItems(req, res) {
  try {
    const sql = await dbConnect();
    const result = await sql.query`EXEC getAll`;
    console.dir(result.recordsets); 
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching menu items:', error.message);
    res.status(500).json({ error: 'Error fetching menu items' });
  }
}

async function getAllSections(req, res) {
  try {
    const sql = await dbConnect();
    const result = await sql.query`SELECT * FROM SECTIONS`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching sections:', error.message);
    res.status(500).json({ error: 'Error fetching sections' });
  }
}

async function test(req, res) {
  try {
    const sql = await dbConnect();
    const result = await sql.query`SELECT * FROM MENU`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching sections:', error.message);
    res.status(500).json({ error: 'Error fetching sections' });
  }
}

async function getItemsBySection(req, res) {
  try {
    const { section } = req.params;
    const sql = await dbConnect();
    const result = await sql.query`EXEC sec ${section}`;
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching items by section:', error.message);
    res.status(500).json({ error: 'Error fetching items by section' });
  }
}

async function deleteItem(req, res) {
  try {
    const name = req.params.name; 
    const sql = await dbConnect();
    const result = await sql.query`DELETE FROM MENU WHERE NAME = ${name}`;
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({ error: 'Error deleting item' });
  }
}

async function addItem(req, res) {
  try {
    const { NAME, IMG,  PRICE, SECTION, ONSALE, NEW } = req.body;
    const sql = await dbConnect();
    const sectionResult = await sql.query`SELECT SECTION_ID FROM SECTIONS WHERE NAME = ${SECTION}`;
    const sectionId = sectionResult.recordset[0].SECTION_ID;
    const result = await sql.query`INSERT INTO MENU (NAME, IMG, PRICE, SECTION, ONSALE, NEW) VALUES (${NAME}, ${IMG}, ${PRICE}, ${sectionId}, ${ONSALE}, ${NEW})`;
    res.json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding item:', error.message);
    res.status(500).json({ error: 'Error adding item' });
  }
}


async function updateItem(req, res) {
  try {
    const { name } = req.params;
    const { NAME, IMG, PRICE, ONSALE, NEW } = req.body;
    const sql = await dbConnect();
    const result = await sql.query`
    UPDATE MENU 
    SET NAME = ${NAME}, IMG = ${IMG}, PRICE = ${PRICE}, ONSALE = ${ONSALE}, NEW = ${NEW}  
    WHERE NAME = ${name}
    `;
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ error: 'Error updating item' });
  }
}



module.exports = {
  getAllItems,
  getAllSections,
  getItemsBySection,
  deleteItem,
  addItem,
  updateItem,
  test
};
