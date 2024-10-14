
export default function ByRating({ uniqueRatings, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueRatings.map((rating: any) => (
						<li key={rating}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter.ratings.includes(rating?.review)}
									onChange={handleCheckboxChange("ratings", rating?.review)}
								/>
								{rating?.review} stars
								<span className="text-sm-medium">
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
								</span>
								<span className="checkmark" />
							</label>
						</li>
					))}					
				</ul>
			</div>
		</>
	)
}
