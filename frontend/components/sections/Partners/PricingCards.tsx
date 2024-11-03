"use client"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import parse from 'html-react-parser';
import { NumericFormat } from "react-number-format";
export interface Partners {
	id: number;
	content_for: string;
	title: string;
	sub_title: string;
	pricing_cards?: string;
	company_benifits?: string;
	image: string;
	status: string;
}

export interface PricingCards {
	title: string;
	sub_title: string;
	price: string;
	duration: string;
	button_text: string;
	tag: string;
}
export interface BenefitItem {
	benefit: string;
}

export interface CompanyBenefits {
	title: string;
	benefits: BenefitItem[];
	voucer_title: string;
}
export default function PricingCards({ partner }: { partner: Partners }) {
	const parsedPricingCards: PricingCards[] = JSON.parse(partner?.pricing_cards || '[]')
	const parsedCompanyBenefits = JSON.parse(partner?.company_benifits || '{}') as CompanyBenefits;
	return (
		<div className="custom-gradient min-vh-100">
			<section className="container py-5 text-center">
				<h1 className="mb-4 display-5 text-neutral-1000 fw-bold">
					{partner?.title}
				</h1>
				<div className="mx-auto text-muted custom-max-width">
					{parse(partner?.sub_title)}
				</div>
			</section>

			{
				partner?.content_for === "section_one" && <section className="container py-4">
					<div className="row g-4">
						{/* Experience Plans */}
						{parsedPricingCards.map((plan, index) => (
							<div key={index} className="col-md-6 col-lg-4">
								<div className="card pricing-card h-100">
									<div className="ribbon">
										<span className="ribbon-text">{plan.tag}</span>
									</div>
									<div className="card-header text-center border-0 bg-transparent pt-4">
										<h3 className="fs-4 fw-bold">{plan.title}</h3>
									</div>
									<div className="card-body text-center">
										<div className="price-container">
											<div className="display-6 fw-bold mb-1">{<NumericFormat
												value={Number(plan?.price)}
												displayType="text"
												thousandSeparator={","}
												decimalSeparator="."
												decimalScale={2}
												fixedDecimalScale
												suffix='€'
											/>}</div>
											<div className="text-muted small fw-medium">{plan.duration}</div>
										</div>
										<p className="mt-4 text-muted fw-medium">{plan.sub_title}</p>
									</div>
									<div className="card-footer border-0 bg-transparent p-4">
										<button className="btn custom-btn w-100">{plan.button_text}</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			}

			{/* Benefits Section */}
			{
				partner?.content_for === "section_two" && <section className="container py-5">
					<h2 className="mb-4 text-center fw-bold">{parsedCompanyBenefits?.title}</h2>
					<div className="row justify-content-center">
						<div className="col-lg-8">
							{
								parsedCompanyBenefits?.benefits?.map((benefit: BenefitItem, index: number) => (
									<div key={index} className="card benefit-card mb-3">
										<div className="card-body p-4">
											<div className="d-flex gap-3">
												<div>
													<CheckCircleIcon className="check-icon" />
												</div>
												<p className="mb-0">{benefit.benefit}</p>
											</div>
										</div>
									</div>
								))
							}
						</div>
					</div>
				</section>}

			{
				partner?.content_for === "section_two" && <section className="container py-5">
					<h2 className="mb-4 text-center fw-bold">{parsedCompanyBenefits?.voucer_title}</h2>
					<div className="row justify-content-center">
						<div className="col-lg-8">
							<div className="position-relative">
								<div className="card voucher-card overflow-hidden">
									<div className="card-body p-0">
										<img
											src={process.env.NEXT_PUBLIC_STORAGE_URL + partner?.image}
											alt="Voucher example"
											className="img-fluid w-100 voucher-image"
										/>
									</div>
								</div>
								<div className="pdf-demo-container position-absolute">
									<p className="text-center text-uppercase fw-bold mb-0 w-full">PDF Demostrativo</p>
								</div>
							</div>
						</div>
					</div>
				</section>}
		</div>
	)
}