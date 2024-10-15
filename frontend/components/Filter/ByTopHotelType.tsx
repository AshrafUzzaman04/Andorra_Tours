export default function ByTopHotelType({ uniqueHotelsType, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueHotelsType.map((hotel: any,index:number) => (
						<li key={hotel}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter?.hotelType?.includes(hotel?.hotel_type)}
									onChange={handleCheckboxChange("hotelType", hotel?.hotel_type)}
								/>

								<span className="text-sm-medium">{hotel?.hotel_type} </span>
								<span className="checkmark" />
							</label>
							<span className="number-item">{hotel?.count}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
