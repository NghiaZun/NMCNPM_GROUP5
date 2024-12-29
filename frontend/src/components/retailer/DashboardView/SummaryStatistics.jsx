import React, { useEffect } from "react";

const Dashboard = ({ stats, products }) => {
    const processedStats = [
        {
            id: 1,
            label: "Total Products",
            value: products?.length || 0,
            icon: "📋",
        },
        {
            id: 2,
            label: "Total Orders",
            value: stats?.totalOrders || 0,
            icon: "📦",
        },
        {
            id: 3,
            label: "Total Delivered",
            value: stats?.totalDelivered || 0,
            icon: "📮",
        },
        {
            id: 4,
            label: "Total Revenue",
            value: stats?.totalRevenue.toFixed(0) || 0,
            icon: "💰",
        },
    ];

    if (!processedStats || processedStats.length === 0) {
        return <div>No data available.</div>;
    }

    return (
        <div className="flex flex-nowrap justify-center gap-6 p-6 bg-gray-100 w-full max-w-full">
            {processedStats.map((stat) => (
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