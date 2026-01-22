import ConsultancyModel from "../model/ConsultancyModel.js";

export const createConsultancyRequest = async (req, res) => {
    try {
        const { type, fulllName, dateofBirth, timeofBirth, placeofBirth, gender, areaOfConcern, price } = req.body;

        const pendingConsultancyRequest = await ConsultancyModel.findOne({ userId: req.user._id, status: "pending" });
        if (pendingConsultancyRequest) {
            return res.status(400).json({ success: false, message: "You already have a pending consultancy request" });
        }
        const newConsultancyRequest = new ConsultancyModel({
            userId: req.user._id,
            type,
            fulllName,
            dateofBirth,
            timeofBirth,
            placeofBirth,
            gender,
            areaOfConcern,
            price,
            paidAt: Date.now()
        });

        await newConsultancyRequest.save();


        res.status(201).json({ success: true, message: "Consultancy request created successfully", data: newConsultancyRequest });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "create consultancy request Server Error" });
    }

};

export const getAllConsultancyRequests = async (req, res) => {
    try {
        const consultancyRequests = await ConsultancyModel.find({ userId: req.user._id });
        res.status(200).json({ success: true, data: consultancyRequests });
    } catch (error) {
        console.log(`error coming from get all consultancy request controller ${error}`);
        res.status(500).json({ success: false, message: "get all consultancy request Server Error" });
    }
};

// Admin: Get ALL consultancy requests (not filtered by user)
export const getAdminAllConsultancyRequests = async (req, res) => {
    try {
        const consultancyRequests = await ConsultancyModel.find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: consultancyRequests });
    } catch (error) {
        console.log(`error coming from admin get all consultancy request controller ${error}`);
        res.status(500).json({ success: false, message: "get all consultancy request Server Error" });
    }
};

export const getConsultancyRequestById = async (req, res) => {
    try {
        const consultancyRequest = await ConsultancyModel.findOne({ _id: req.params.id, userId: req.user._id });
        if (!consultancyRequest) {
            return res.status(404).json({ success: false, message: "Consultancy request not found" });
        }
        res.status(200).json({ success: true, data: consultancyRequest });
    } catch (error) {
        console.log(`error coming from get consultancy request by id controller ${error}`);
        res.status(500).json({ success: false, message: "get consultancy request by id Server Error" });
    }
};

export const updateConsultancyRequestStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const consultancyRequest = await ConsultancyModel.findOneAndUpdate(
            { _id: req.params.id },
            { status },
            { new: true }
        );
        if (!consultancyRequest) {
            return res.status(404).json({ success: false, message: "Consultancy request not found" });
        }
        res.status(200).json({ success: true, data: consultancyRequest });
    } catch (error) {
        console.log(`error coming from update consultancy request status controller ${error}`);
        res.status(500).json({ success: false, message: "update consultancy request status Server Error" });
    }
};

export const deleteConsultancyRequest = async (req, res) => {
    try {
        const consultancyRequest = await ConsultancyModel.findOneAndDelete({ _id: req.params.id });
        if (!consultancyRequest) {
            return res.status(404).json({ success: false, message: "Consultancy request not found" });
        }
        res.status(200).json({ success: true, message: "Consultancy request deleted successfully" });
    } catch (error) {
        console.log(`error coming from delete consultancy request controller ${error}`);
        res.status(500).json({ success: false, message: "delete consultancy request Server Error" });
    }
};


