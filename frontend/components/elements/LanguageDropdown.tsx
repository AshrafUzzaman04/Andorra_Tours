import Link from 'next/link';
import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
export interface LanguageData{
	id:number,
	name:string,
	language_code:string
}
export interface Languages{
	languages:LanguageData[]
}
export default function LanguageDropdown({languages}:Languages) {
	const [language, setLanguage] = useState("en");

	return (
		<>
			<Dropdown className="d-none d-xxl-inline-block box-dropdown-cart align-middle mr-15">
				<Dropdown.Toggle as="span" className="text-14-medium icon-list icon-account icon-lang">
					<span className="text-14-medium arrow-down uppercase">{language}</span>
				</Dropdown.Toggle>
				<Dropdown.Menu className="dropdown-account" style={{visibility: 'visible'}}>
					<ul>
						{
							languages && languages?.map((language, index)=>(
								<li key={index}> <Link className="text-sm-medium" href="/" locale={language?.language_code||undefined} onClick={()=>setLanguage(language?.language_code)}>{language?.name}</Link></li>
							))
						}
					</ul>
				</Dropdown.Menu>
			</Dropdown>
		</>
	)
}