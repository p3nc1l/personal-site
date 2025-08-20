import { VerifyEmail } from "../actions";

const Page = async (props: { params: Promise<{ token: string }> }) => {
  const { token } = await props.params;

  if (await VerifyEmail(token)) return (
    <div>Message sent!</div>
  )
  else return (
    <div>The link either can not be found or is expired!</div>
  )
}

export default Page