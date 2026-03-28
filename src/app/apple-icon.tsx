import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 180,
                    height: 180,
                    background: '#000',
                    borderRadius: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingLeft: 36,
                    gap: 18,
                }}
            >
                <div
                    style={{
                        width: 108,
                        height: 14,
                        background: '#fff',
                        borderRadius: 7,
                    }}
                />
                <div
                    style={{
                        width: 76,
                        height: 14,
                        background: '#fff',
                        borderRadius: 7,
                        opacity: 0.8,
                    }}
                />
                <div
                    style={{
                        width: 50,
                        height: 14,
                        background: '#fff',
                        borderRadius: 7,
                        opacity: 0.6,
                    }}
                />
                <div
                    style={{
                        width: 28,
                        height: 14,
                        background: '#fff',
                        borderRadius: 7,
                        opacity: 0.4,
                    }}
                />
            </div>
        ),
        { ...size },
    );
}
