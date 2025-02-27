import { siteConfig } from "@/config/site";
import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import Footer from "./components/footer";

const NewSubscriber = ({
  email = "john@doe.com",
}: {
  email: string;
}) => (
  <Html>
    <Head>
      <Font
        fontFamily="Ubuntu"
        fallbackFontFamily="sans-serif"
        webFont={{
          url: "https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72nU6AFw.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>
    <Preview>New subscriber</Preview>
    <Body style={{ ...main, fontFamily: "Ubuntu" }}>
      <Container style={container}>
        <Heading className="text-2xl my-12  text-secondary" style={h1}>
          New subscriber
        </Heading>
        <Text style={{ fontWeight: "bold" }}>{email}</Text>
        <Text style={{ fontSize: 14 }}>subscribed to your newsletter</Text>
        <Link
          href={`${siteConfig.links.app}/settings/subscribers`}
          target="_blank"
          style={link}
        >
          Click here to see all your subscribers
        </Link>
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default NewSubscriber;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const link = {
  color: "#606060",
  fontSize: "14px",
  textDecoration: "underline",
};
