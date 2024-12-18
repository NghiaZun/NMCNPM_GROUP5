import React, { useState, useEffect } from "react";
import { retailerService } from "../../../services/retailerService";

const Dashboard = ({ products }) => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await retailerService.getDashboard(token);
                if (data?.data) {
                    const new_stats = [
                        {
                            id: 1,
                            label: "Total Products",
                            value: products?.length || 0, // Lấy dữ liệu từ props
                            icon: "📋",
                        },
                        {
                            id: 2,
                            label: "Total Orders",
                            value: data.data.totalOrders,
                            icon: "📦",
                        },
                        {
                            id: 3,
                            label: "Total Delivered",
                            value: data.data.totalDelivered,
                            icon: "📮",
                        },
                        {
                            id: 4,
                            label: "Total Revenue",
                            value: data.data.totalRevenue,
                            icon: "💰",
                        },
                    ];
                    setStats(new_stats);
                } else {
                    setError("Invalid data format.");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load data");
                setLoading(false);
            }
        };

        fetchData();
    }, [products]); // Thêm products vào dependencies để cập nhật khi products thay đổi

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-nowrap justify-center gap-6 p-6 bg-gray-100 w-full max-w-full">
            {stats.map((stat) => (
                <div
                    key={stat.id}
                    className="flex items-center justify-between w-1/4 min-w-[150px] p-4 bg-white rounded-lg shadow-lg"
                >
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 text-2xl text-green bg-emerald-100 rounded-full">
                            {stat.icon}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
