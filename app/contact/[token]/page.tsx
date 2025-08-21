import { notFound } from "next/navigation";
import { VerifyEmail } from "../actions";
import VerifySection from "./VerifySection";

const Page = async (props: { params: Promise<{ token: string }> }) => {
  const { token } = await props.params;

  if (await VerifyEmail(token)) return (
    <VerifySection success={true} />
  )
  else {
    notFound();
  }
}

export default Page