import React, { useEffect, useState } from "react";
import ProfileHeader from "../../components/partials/ProfileHeader";
import ProfileMain from "../../components/partials/ProfileMain";
import { userService } from "../../services/userService";

const RetailerProfile = () => {
    const token = localStorage.getItem("token");
    const [retailerData, setRetailerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRetailerProfile = async () => {
            try {
                const response = await userService.getUserProfile(token);
                setRetailerData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        if (token) {
            fetchRetailerProfile();
        } else {
            setError("No token found");
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="">
            <ProfileHeader retailerData={retailerData} />
            <ProfileMain retailerData={retailerData} />
        </div>
    );
};

export default RetailerProfile;
