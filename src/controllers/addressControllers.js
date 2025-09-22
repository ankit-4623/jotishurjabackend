import Address from "../model/addressModel.js";

export const Addaddress = async (req, res) => {
  try {
    const { user, address, city, pincode, notes, phone } = req.body;
    if (!user || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    const addressdata = new Address({
      user,
      address,
      city,
      pincode,
      notes,
      phone,
    });
    await addressdata.save();
    res.status(201).json({
      success: true,
      data: addressdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const fetchAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const alladdress = await Address.find({user:id}).populate({
      path: "user",
      select: "name email",
    });;
    if (!alladdress||alladdress.length === 0) {
      return res.status(404).json({ message: "no address found " });
    }

    res.status(200).json({
      success: true,
      data: alladdress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};


export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        user:Id,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User and address id is required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, user:Id });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};