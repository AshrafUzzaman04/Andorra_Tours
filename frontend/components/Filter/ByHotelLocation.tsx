
export default function ByHotelLocation({ uniqueLocations, filter, handleCheckboxChange, checked }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueLocations?.map((location: any, i:number) => (
						<li key={i+1}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={location?.location === checked}
									onChange={handleCheckboxChange(location?.location)}
								/>

								<span className="text-sm-medium">{location?.location} </span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{location?.count}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
