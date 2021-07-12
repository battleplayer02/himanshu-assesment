let db = require('../db');
let login = db.login;

module.exports = {
    addUser: async (req, res) => {
        try {
            console.log(req.body);
            let data = await login.build(req.body)
            await data.save()
            res.status(200).json({ ...data.dataValues })
        } catch (error) {
            res.status(400).json({ success: "0", error: error.message })
        }
    },
    findUser: async (req, res) => {
        try {
            let data = await login.findOne({ where: req.body });
            res.status(200).json({ ...data.dataValues })
        } catch (error) {
            res.status(400).json({ success: "0", error: error.message })
        }
    }
}
