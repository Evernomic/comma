import { siteConfig } from "@/config/site";
import type { NewsletterProps } from "@/types";
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

export default function Newsletter({
  title = "Test article",
  author = "Author",
  articleURL = siteConfig.url,
  published = "Jun 15, 2024",
  subId = "subId",
}: NewsletterProps) {
  return (
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
      <Preview>{author} published an article</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{author} published an article</Heading>
          <Link
            href={articleURL}
            style={{
              ...text,
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {title}
          </Link>
          <Text
            style={{
              ...text,
              marginTop: "10px",
              color: "#606060",
              fontWeight: "bold",
            }}
          >
            {published}
          </Text>
          <Link href={articleURL} style={button}>
            Read on web
          </Link>
          <Text style={footer}>
            <Link href={siteConfig.url} target="_blank" style={link}>
              comma.to
            </Link>
            <Link
              href={`${siteConfig.url}/unsubscribe?subId=${subId}`}
              target="_blank"
              style={{
                ...link,
                float: "right",
              }}
            >
              unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Ubuntu",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontSize: "22px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
};

const button = {
  display: "block",
  padding: "10px",
  fontSize: "14px",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  color: "#000000",
};

const link = {
  color: "#606060",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontSize: "14px",
  margin: "20px 0",
};

const footer = {
  color: "#606060",
  fontSize: "12px",
  lineHeight: "22px",
  margin: "24px 0px",
};
