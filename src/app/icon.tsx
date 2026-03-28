import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 32,
                    height: 32,
                    background: '#000',
                    borderRadius: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingLeft: 6,
                    gap: 4,
                }}
            >
                {/* Stylised order-book depth bars — decreasing width = price levels */}
                <div
                    style={{
                        width: 20,
                        height: 3,
                        background: '#fff',
                        borderRadius: 2,
                    }}
                />
                <div
                    style={{
                        width: 14,
                        height: 3,
                        background: '#fff',
                        borderRadius: 2,
                        opacity: 0.8,
                    }}
                />
                <div
                    style={{
                        width: 9,
                        height: 3,
                        background: '#fff',
                        borderRadius: 2,
                        opacity: 0.6,
                    }}
                />
                <div
                    style={{
                        width: 5,
                        height: 3,
                        background: '#fff',
                        borderRadius: 2,
                        opacity: 0.4,
                    }}
                />
            </div>
        ),
        { ...size },
    );
}
