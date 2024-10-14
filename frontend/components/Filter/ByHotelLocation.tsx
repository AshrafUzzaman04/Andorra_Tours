
export default function ByHotelLocation({ uniqueLocations, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueLocations.map((location: any,i:number) => (
						<li key={i}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter.locations.includes(location?.location)}
									onChange={handleCheckboxChange("locations", location?.location)}
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
