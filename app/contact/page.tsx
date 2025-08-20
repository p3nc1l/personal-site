import contactInfo from "../contactInfo"
import Button from "../ui/Button";
import { SendMessage } from "./actions";

const Page = () => {
  const inputFields = [{
    name: "fullName",
    label: "Full Name",
    type: "text"
  }, {
    name: "email",
    label: "Email address",
    type: "email"
  }, {
    name: "subject",
    label: "Subject",
    type: "text"
  }, {
    name: "content",
    label: "Message",
    type: "multiline"
  }]
  const inputClasses = "border-neutral-400 border-1 p-2 rounded-sm bg-neutral-900 w-full";

  return (
    <>
      <section>
        <div className="max-w-6xl mx-auto py-2 text-xl">
          <div>For enquiries, please contact me at:</div>
          <div className="flex flex-col sm:flex-row py-4 gap-4">
            {contactInfo.map((field, index) => 
            <div key={index} className="flex flex-col gap-2">
              <span>{field.label}</span>
              <a className="text-white font-bold" href={field.href}>{field.value}</a>
            </div>)}
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col items-center gap-4 mb-8">
          <span className="text-3xl font-bold">Contact Form</span>
          <form action={SendMessage} className="text-xl w-full max-w-2xl flex flex-col items-center gap-2">
              {inputFields.map((field, index) => <label className="w-full" key={index}>
                <div className="mb-1">{field.label}</div>
                {field.type != "multiline" ? <input type={field.type} name={field.name} className={inputClasses} /> :
                <textarea name={field.name} className={inputClasses + " " + "h-40"} />}
              </label>)}
              <div className="w-44"><button className="w-full" type="submit"><Button size="large" fullWidth>SUBMIT</Button></button></div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Page