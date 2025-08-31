import React, { useState } from "react";

declare global {
    interface Window {
        Mappls: any;
    }
}

interface PlaceCardProps {
    name: string;
    pin: string;
    lat: number;
    lng: number;
}

export default function PlaceCard({ name, pin, lat, lng }: PlaceCardProps) {
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchDetails = async () => {
        if (details || loading) return;
        setLoading(true);

        window.Mappls.getPinDetails({ pin }, (data: any) => {
            if (data?.status === "success") {
                const imgUrl = `https://apis.mappls.com/advancedmaps/api/djuliriwwyhwhjympauyjcpueskqakjyzryd/still_image?center=${lat},${lng}&zoom=14&size=400x300&access_token=5bf11a4e9d95f508ff3a19c0b1a78538`;

                setDetails({
                    ...data,
                    imgUrl,
                });
            }
            setLoading(false);
        });
    };

    return (
        <div
            className="relative group cursor-pointer"
            onMouseEnter={fetchDetails}
        >
            <span className="text-blue-600 underline">{name}</span>

            {/* Hover Card */}
            {details && (
                <div className="absolute z-50 bg-white border rounded-lg shadow-lg p-4 w-72 hidden group-hover:block">
                    <img
                        src={details.imgUrl}
                        alt={name}
                        className="w-full h-32 object-cover rounded"
                    />
                    <h3 className="text-lg font-semibold mt-2">
                        {details.name || name}
                    </h3>
                    <p className="text-sm text-gray-600">{details.address}</p>
                </div>
            )}
        </div>
    );
}
