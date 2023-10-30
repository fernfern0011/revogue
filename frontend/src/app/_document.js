import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                {/* Bootstrap */}
                <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/sticky-footer-navbar/" />
                <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />

                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>

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