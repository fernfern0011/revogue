import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Bootstrap */}
                <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sticky-footer-navbar/" />
                <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />

                {/* Cloudinary */}
                <script src="https://upload-widget.cloudinary.com/global/all.js" type='text/javascript' />

            </Head>
            <body>
                <Main />
                <NextScript />

                <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </Html>
    )
}