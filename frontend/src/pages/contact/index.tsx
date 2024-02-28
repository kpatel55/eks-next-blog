import Head from "next/head";
import { ReactElement } from "react";
import { ContactForm } from "../../components/contact/contact-form";
import { ContactLayout } from "../../components/contact/contact-layout";

const Contact = () => {
    return (
        <>
            <Head>
                <title>
                    Contact | Next.js Blog
                </title>
            </Head>
            <ContactForm />
        </>
    );
};

Contact.getLayout = function getLayout(page: ReactElement) {
    return (
        <ContactLayout>
            {page}
        </ContactLayout>
    );
}

export default Contact;