let db = require('../db');
let alert = db.alert;

module.exports = {
    insert: async (req, res) => {
        try {
            console.log(req.body);
            let data = await alert.build(req.body)
            await data.save()
            res.status(200).json({ ...data.dataValues })
        } catch (error) {
            console.log(error);
            res.status(200).json({ success: "0", error: "Email must be unique." })
        }
    },
    selectall: async (req, res) => {
        try {
            let data = await alert.findAll();
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json({ success: "0", error: error.message })
        }
    },
    deletealert: async (req, res) => {
        try {
            let data = await alert.destroy({
                where: {
                    email: req.body.email
                }
            });
            if (res > 0) {
                return res.status(200).json(data)
            } else {
                return res.status(200).json(data)
            }
        } catch (error) {
            res.status(400).json({ success: "0", error })
        }
    }
}
