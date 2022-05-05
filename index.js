const cors = require('cors');
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(cors());
app.use(routes);



const startServer = (port) => {
	try {
		app.listen(port, () => {
			console.log(`Server listening on port: http://localhost:${port}`);
		});
	} catch (error) {
		console.error(error);
		process.exit();
	}
};

startServer(process.env.PORT || 5000);
