import { siteConfig } from "@/config/site";
import { Img, Link, Text } from "@react-email/components";

export default function Footer() {
  return (
    <Text style={footer}>
      <Img
        src={`${siteConfig.url}/_static/comma-logo.png`}
        width="32"
        height="32"
        alt="Comma's Logo"
        style={{ marginBottom: "20px" }}
      />
      <Link
        href={siteConfig.url}
        target="_blank"
        style={{
          textDecoration: "underline",
          color: "#606060",
        }}
      >
        {siteConfig.domain}
      </Link>
      , an open-source blogging platform,
      <br />
      with a minimal and beautiful page.
    </Text>
  );
}

const footer = {
  color: "#606060",
  fontSize: "14px",
  lineHeight: "22px",
  marginTop: "48px",
  marginBottom: "24px",
};
