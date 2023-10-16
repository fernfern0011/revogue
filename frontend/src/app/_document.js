import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <script src="https://upload-widget.cloudinary.com/global/all.js" type='text/javascript' />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}