import contactInfo from "../contactInfo"

const Page = () => {
 return (
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
 )
}

export default Page