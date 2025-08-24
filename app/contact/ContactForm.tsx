"use client";

import { useActionState } from "react";
import { SendMessage } from "./actions";
import Button from "../ui/Button";

const InputField = (props: { name: string, type: string, label: string }) => {
  const styleClasses = "border-neutral-400 border-1 p-2 rounded-sm bg-neutral-900 w-full";

  return (
    <label className="w-full">
      <div className="mb-1">{props.label}</div>
      {props.type != "multiline" ? <input type={props.type} name={props.name} className={styleClasses} /> :
      <textarea name={props.name} className={styleClasses + " " + "h-40"} />}
    </label>
  )
}

const ContactForm = () => {
  const [state, formAction, pending] = useActionState((_: void, formData: FormData) => SendMessage(formData), undefined)

  return (
    <form action={formAction} className="text-xl w-full max-w-2xl flex flex-col items-center gap-2">
        <InputField name={"fullName"} label="Name" type="text" />
        <InputField name={"email"} label="Email address" type="email" />
        <InputField name={"subject"} label="Subject" type="text" />
        <InputField name={"content"} label="Message" type="multiline" />
        <div className="w-44"><button className="w-full" type="submit"><Button size="large" fullWidth loading={pending}>SUBMIT</Button></button></div>
    </form>
  )
}

export default ContactForm