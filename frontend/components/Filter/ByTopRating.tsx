
export default function ByTopRating({ uniqueRatings, filter, handleCheckboxChange }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<ul className="list-filter-checkbox">
					{uniqueRatings.map((rating: any, index:number) => (
						<li key={index}>
							<label className="cb-container">
								<input
									type="checkbox"
									checked={filter === rating?.review}
									onChange={handleCheckboxChange(rating?.review)}
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
