import Address from '../models/addressSchema.js';

export const addAddress = async (req, res) => {
  try {
    const { userId, fullName, phone, street, city, state, zipCode } = req.body;
    const newAddress = new Address({
      userId,
      fullName,
      phone,
      street,
      city,
      state,
      zipCode
    });
    await newAddress.save();
    res.status(201).json({ message: 'Address added successfully', address: newAddress });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
export const getAddresses = async (req, res) => {
  const { userID } = req.body;
  try {
    const addresses = await Address.findOne({ userID });
    if (!userID) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
    res.status(200).json({
      message: 'Addresses retrieved successfully',
      data: addresses
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

export const addresses = async (req, res) => {
  try {
    const allAddresses = await Address.find();
    res.status(200).json(allAddresses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAddressesByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const addresses = await Address.find({ userId });
    if (!addresses) {
      return res.status(404).json({ message: 'No addresses found for this user.' });
    }
    res.status(200).json({ message: 'Addresses retrieved successfully', addresses });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};