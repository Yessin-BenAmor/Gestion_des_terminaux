const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());

 app.use(cors({
  origin: 'http://localhost:4200' // Adjust the origin as needed
}));
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion_des_terminaux',
  password: 'user',
  port: 5432, 
});

// Test  database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Connected to the database', res.rows[0]);
  }
});

// Sign-up 
app.post('/api/signUp', async (req, res) => {
  const { username, id_team, password } = req.body;
  try {
    const userCheckQuery = 'SELECT * FROM "Utilisateur" WHERE username = $1';
    const userCheckResult = await pool.query(userCheckQuery, [username]);

    if (userCheckResult.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
        }
    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO "Utilisateur" (username, id_team, password) VALUES ($1, $2, $3) RETURNING id';
    const values = [username, id_team, hashedPassword];
    console.log("ena values",values)
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(400).json({ error: 'Failed to sign up user' });
  }
});



// Sign-in 
app.post('/api/signIn', async (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM "Utilisateur" WHERE username = $1';
  const values = [username];

  try {
    const result = await pool.query(query, values);
      
    if (result.rows.length === 0) {
      return res.status(400).send('User not found');
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send('Invalid password');
    }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id, username: user.username }, 'your_jwt_secret', );
      res.status(200).send({ message: 'Login successful',userId: user.id, token });
    } catch (err) {
      console.error('Error during sign-in:', err);
      res.status(500).send(err.message);
    }
  });

//create tid 
  app.post('/api/createTID', async (req, res) => {
  const { TID, sponsor, GEM_Test, GEM_Auto, GEM_UT4DEV, Terminal_type, DCC_Test,UPI_Test,UPI_Auto,DCC_Auto,DCC_UT4DEV,UPI_UT4DEV, id } = req.body;
  console.log("Request body:", req.body);
const query = `INSERT INTO "TID" 
("TID", "sponsor", "GEM_Test", "GEM_Auto", "GEM_UT4DEV", "Terminal_type", "DCC_Test", "UPI_Test", "UPI_Auto", "DCC_Auto", "DCC_UT4DEV", "UPI_UT4DEV", "id") 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
RETURNING "id_tid";
`;

  const values = [TID, sponsor, GEM_Test, GEM_Auto, GEM_UT4DEV, Terminal_type, DCC_Test,UPI_Test,UPI_Auto,DCC_Auto,DCC_UT4DEV,UPI_UT4DEV,id];
  console.log("Values:", values);

  try {
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'TID created successfully', id_tid: result.rows[0].id_tid });
  } catch (err) {
    console.error('Error during TID creation:', err);
    res.status(400).json({ error: 'Failed to create TID' });
  }
});


//  getTID 
app.get('/api/getTID', async (req, res) => {
  const id = parseInt(req.query.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID must be an integer' });
  }

  const query = `SELECT * FROM "TID" WHERE "id" = $1`;

  try {
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      res.json(result.rows); // return l rows
    } else {
      res.status(200).json([]); // return nothing
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete       TID
app.delete('/api/deleteTID', async (req, res) => {
  const id = req.query.id;
  const id_tid = req.query.id_tid;
  const query = `DELETE FROM "TID" WHERE "id_tid" = $1 AND "id" = $2`;
  const values = [id_tid, id];
  
  try {
    const result = await pool.query(query, values);
    console.log("tfasakh", result);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'TID deleted successfully' });
    } else {
      res.status(404).json({ error: 'TID not found' });
    }
    
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  


//updateTID
app.put('/api/updateTID', async (req, res) => {
  // Access formData and id_tid from req.body
  const { TID, sponsor, GEM_Test, GEM_Auto, GEM_UT4DEV, Terminal_type, DCC_Test, UPI_Test, UPI_Auto, DCC_Auto, DCC_UT4DEV, UPI_UT4DEV, id_tid } = req.body;
 
  console.log("Request body:", req.body);

  const query = `UPDATE "TID" 
    SET "TID" = $1, "sponsor" = $2, "GEM_Test" = $3, "GEM_Auto" = $4, "GEM_UT4DEV" = $5, "Terminal_type" = $6, "DCC_Test" = $7, "UPI_Test" = $8, "UPI_Auto" = $9, "DCC_Auto" = $10, "DCC_UT4DEV" = $11, "UPI_UT4DEV" = $12 
    WHERE "id_tid" = $13`;

  const values = [TID, sponsor, GEM_Test, GEM_Auto, GEM_UT4DEV, Terminal_type, DCC_Test, UPI_Test, UPI_Auto, DCC_Auto, DCC_UT4DEV, UPI_UT4DEV, id_tid];
  
   try {
    const result = await pool.query(query, values);
    console.log("Result:", result);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'TID updated successfully' });
    } else {
      res.status(404).json({ error: 'TID not found' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//create terminal 


app.post('/api/createTerminal', async (req, res) => {
  const { terminalType, serialNumber, profile, TID, DB, comment, wifiMacAddress } = req.body;
  console.log("Request body:", req.body);

  const query = `
    INSERT INTO "Terminal" ("terminalType", "serialNumber", "profile", "TID", "DB", "comment", "wifiMacAddress")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING "id_terminal";
  `;

  const values = [terminalType, serialNumber, profile, TID, DB, comment, wifiMacAddress];
  console.log("Values:", values);

  try {
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Terminal created successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error inserting terminal:', error);
    res.status(500).json({ message: 'Error creating terminal', error: error.message });
  }
});

//get terminal  
app.get('/api/getTerminal', async (req, res) => {
  const query = 'SELECT * FROM "Terminal"';
  
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching terminals:', error);
    res.status(500).json({ message: 'Error fetching terminals', error: error.message });
  }
});


//update terminal  
app.put('/api/updateTerminal', async (req, res) => {
 
  const { terminalType, serialNumber, profile, TID, DB, comment, wifiMacAddress,id_terminal } = req.body;

  const query = `
    UPDATE "Terminal"
    SET "terminalType" = $1, "serialNumber" = $2, "profile" = $3, "TID" = $4, "DB" = $5, "comment" = $6, "wifiMacAddress" = $7
    WHERE "id_terminal" = $8
    RETURNING *;
  `;

  const values = [terminalType, serialNumber, profile, TID, DB, comment, wifiMacAddress, id_terminal];
 
  try {
    console.log("Values:", values);
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Terminal not found' });
    }
    res.status(200).json({ message: 'Terminal updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error updating terminal:', error);
    res.status(500).json({ message: 'Error updating terminal', error: error.message });
  }
});







//delete terminal  
app.delete('/api/deleteTerminal', async (req, res) => {
  const  {id_terminal}  = req.query;
  console.log("id_terminal:", id_terminal);
  const query = 'DELETE FROM "Terminal" WHERE "id_terminal" = $1 RETURNING *';
  
  try {
     const result = await pool.query(query, [id_terminal]);
    if (result.rows.length === 0) {
       return res.status(404).json({ message: 'Terminal not found' });
    }
    res.status(200).json({ message: 'Terminal deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting terminal:', error);
    res.status(500).json({ message: 'Error deleting terminal', error: error.message });
  }
});



//Get sponsors
app.get('/api/getSponsors', async (req, res) => {
  const query = 'SELECT * FROM "Sponsor"';
  
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    res.status(500).json({ message: 'Error fetching sponsors', error: error.message });
  }
});
 
// Create a new sponsor
app.post('/api/createSponsor', async (req, res) => {
  const { sponsor } = req.body;
  const query = 'INSERT INTO "Sponsor" (sponsor) VALUES ($1) RETURNING *';
  
  try {
    const result = await pool.query(query, [sponsor]);
    res.status(201).json({ message: 'Sponsor created successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error creating sponsor:', error);
    res.status(500).json({ message: 'Error creating sponsor', error: error.message });
  }
});


// Delete a sponsor
app.delete('/api/deleteSponsor', async (req, res) => {
  const { id_sponsor } = req.query;
  const query = 'DELETE FROM "Sponsor" WHERE "id_sponsor" = $1 RETURNING *';
  
  try {
    const result = await pool.query(query, [id_sponsor]);
     if (result.rows.length === 0) {
       console.log(id_sponsor);
      return res.status(404).json({ message: 'Sponsor not found' });
    }
    res.status(200).json({ message: 'Sponsor deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting sponsor:', error);
    res.status(500).json({ message: 'Error deleting sponsor', error: error.message });
  }
});

 

// Get a single sponsor by ID
app.get('/sponsors/:id', (req, res) => {
  const id_sponsor = parseInt(req.params.id);
  db.query('SELECT * FROM Sponsor WHERE id_sponsor = $1', [id_sponsor], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results.rows[0]);
  });
});

// Create a new sponsor
app.post('/sponsors', (req, res) => {
  const { sponsor } = req.body;
  db.query('INSERT INTO Sponsor (sponsor) VALUES ($1) RETURNING *', [sponsor], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(201).json(results.rows[0]);
  });
});

//update sponsor
app.put('/api/updateSponsor', async (req, res) => {
  const { id_sponsor, sponsor } = req.body;
  console.log ("req.body", req.body);
  if (!id_sponsor || !sponsor) {
    return res.status(400).json({ error: 'sponsor name is required' });
  }

  try {
    const result = await pool.query(
      'UPDATE "Sponsor" SET sponsor = $1 WHERE id_sponsor = $2 RETURNING *',
      [sponsor, id_sponsor]
    );
    if (result.rows.length === 0) {
      console.log("result:", result);
      return res.status(404).json({ error: 'Sponsor not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
});



//create terminal type
app.post('/api/createTerminalType', async (req, res) => {
  const { terminalType } = req.body;
  console.log("Request body:", req.body);
  
  const query = `INSERT INTO "TerminalTypes" ("terminalType") VALUES ($1) RETURNING "id_terminalType";`;
  const values = [terminalType];

  try {
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Terminal Type created successfully', id_terminalType: result.rows[0].id_terminalType });
  } catch (err) {
    console.error('Error during Terminal Type creation:', err);
    res.status(400).json({ error: 'Failed to create Terminal Type' });
  }
});

//get Terminal Type
app.get('/api/getTerminalTypes', async (req, res) => {
  const query = `SELECT * FROM "TerminalTypes"`;

  try {
    const result = await pool.query(query);
    res.json(result.rows); // Return all terminal types
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete terminal type 
app.delete('/api/deleteTerminalType', async (req, res) => {
  const id_terminalType = req.query.id_terminalType;
  
  const query = `DELETE FROM "TerminalTypes" WHERE "id_terminalType" = $1`;
  const values = [id_terminalType];
  
  try {
    const result = await pool.query(query, values);
    console.log("Delete Terminal Type Result:", result);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Terminal Type deleted successfully' });
    } else {
      res.status(404).json({ error: 'Terminal Type not found' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//update terminal type 
app.put('/api/updateTerminalType', async (req, res) => {
  const { terminalType, id_terminalType } = req.body;
  console.log("Request body:", req.body);

  const query = `UPDATE "TerminalTypes" SET "terminalType" = $1 WHERE "id_terminalType" = $2`;
  const values = [terminalType, id_terminalType];
  
  try {
    const result = await pool.query(query, values);
    console.log("Update Terminal Type Result:", result);
    if (result.rowCount > 0) {
      res.status(200).json({ message: 'Terminal Type updated successfully' });
    } else {
      res.status(404).json({ error: 'Terminal Type not found' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});


 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
