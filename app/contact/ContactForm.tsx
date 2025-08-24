"use client";

import { useActionState } from "react";
import { SendMessage } from "./actions";
import Button from "../ui/Button";
import type { MessageBoxData } from "./actions";

const MessageBox = (props: { data: MessageBoxData }) => {
  return (
    <div 
      className="max-w-xl text-black bg-neutral-300 border-1 border-neutral-500 text-lg p-2 rounded-sm"
      style={props.data.error == true ? { backgroundColor: "var(--color-red-200)", color: "var(--color-red-600)", borderColor: "var(--color-red-600)" }: {}}
    >
      {props.data.message}
    </div>
  )
}

const InputField = (props: { name: string, type: string, label: string, required?: boolean }) => {
  const styleClasses = "border-neutral-400 border-1 p-2 rounded-sm bg-neutral-900 w-full";

  return (
    <label className="w-full">
      <div className="mb-1">{props.label}</div>
      {props.type != "multiline" ? <input required={props.required} type={props.type} name={props.name} className={styleClasses} /> :
      <textarea required={props.required} name={props.name} className={styleClasses + " " + "h-40"} />}
    </label>
  )
}

const ContactForm = () => {
  const [state, formAction, pending] = useActionState((_: MessageBoxData | undefined, formData: FormData) => SendMessage(formData), undefined)

  return (
    <form action={formAction} className="text-xl w-full max-w-2xl flex flex-col items-center gap-2">
      {state != undefined && <MessageBox data={state} />}
      <InputField required name={"fullName"} label="Name" type="text" />
      <InputField required name={"email"} label="Email address" type="email" />
      <InputField required name={"subject"} label="Subject" type="text" />
      <InputField required name={"content"} label="Message" type="multiline" />
      <div className="w-44"><button className="w-full" type="submit"><Button size="large" fullWidth loading={pending}>SUBMIT</Button></button></div>
    </form>
  )
}

export default ContactForm