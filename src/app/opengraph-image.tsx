import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: 1200,
                    height: 630,
                    background: '#000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 100px',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                {/* Left — branding */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        maxWidth: 580,
                    }}
                >
                    {/* Icon + wordmark */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 18,
                        }}
                    >
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                background: '#111',
                                border: '1px solid #333',
                                borderRadius: 12,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingLeft: 12,
                                gap: 7,
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 4,
                                    background: '#fff',
                                    borderRadius: 2,
                                }}
                            />
                            <div
                                style={{
                                    width: 22,
                                    height: 4,
                                    background: '#fff',
                                    borderRadius: 2,
                                    opacity: 0.7,
                                }}
                            />
                            <div
                                style={{
                                    width: 14,
                                    height: 4,
                                    background: '#fff',
                                    borderRadius: 2,
                                    opacity: 0.45,
                                }}
                            />
                        </div>
                        <span
                            style={{
                                fontSize: 28,
                                fontWeight: 600,
                                color: '#fff',
                                letterSpacing: '-0.5px',
                            }}
                        >
                            Order Book
                        </span>
                    </div>

                    {/* Headline */}
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 700,
                            color: '#fff',
                            lineHeight: 1.1,
                            letterSpacing: '-2px',
                        }}
                    >
                        Real-time crypto
                        <br />
                        order book data
                    </div>

                    {/* Subline */}
                    <div
                        style={{
                            fontSize: 22,
                            color: '#6e6e73',
                            letterSpacing: '-0.3px',
                            lineHeight: 1.5,
                        }}
                    >
                        Live bid/ask depth for BTC, ETH, XRP, LTC &amp; DOGE.
                        <br />
                        Apple flat design · Dark &amp; light mode · Free &amp;
                        open source.
                    </div>
                </div>

                {/* Right — decorative order-book depth chart */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 14,
                        alignItems: 'flex-end',
                    }}
                >
                    {[
                        { w: 220, o: 1.0 },
                        { w: 180, o: 0.85 },
                        { w: 145, o: 0.7 },
                        { w: 110, o: 0.55 },
                        { w: 80, o: 0.4 },
                        { w: 50, o: 0.25 },
                        { w: 28, o: 0.15 },
                    ].map((bar, i) => (
                        <div
                            key={i}
                            style={{
                                width: bar.w,
                                height: 12,
                                background: '#fff',
                                borderRadius: 6,
                                opacity: bar.o,
                            }}
                        />
                    ))}
                </div>
            </div>
        ),
        { ...size },
    );
}
