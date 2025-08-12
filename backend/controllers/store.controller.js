const { Store } = require('../models');

exports.listStores = async (req, res) => {
  try {
    const stores = await Store.findAll();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.id);
    if (!store) return res.status(404).json({ message: 'Store not found' });
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createStore = async (req, res) => {
  try {
    const { name, address, email } = req.body;
    const newStore = await Store.create({ name, address, email });
    res.status(201).json(newStore);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Store.update(req.body, { where: { id } });

    if (!updated) return res.status(404).json({ message: 'Store not found' });

    const updatedStore = await Store.findByPk(id);
    res.json(updatedStore);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Store.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: 'Store not found' });

    res.json({ message: 'Store deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
