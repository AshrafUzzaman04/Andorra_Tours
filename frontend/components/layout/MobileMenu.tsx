"use client";
import Link from "next/link";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function MobileMenu({
  isMobileMenu,
  handleMobileMenu,
  data,
}: any) {
  const [isAccordion, setIsAccordion] = useState(0);
  const handleAccordion = (key: any) => {
    setIsAccordion((prevState) => (prevState === key ? null : key));
  };
  return (
    <>
      <div
        className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${
          isMobileMenu ? "sidebar-visible" : ""
        }`}
      >
        <PerfectScrollbar className="mobile-header-wrapper-inner">
          <div className="mobile-header-logo">
            <Link className="d-flex w-25" href="/">
              <img
                className="light-mode"
                alt="Travila"
                src={
                  process?.env?.NEXT_PUBLIC_STORAGE_URL +
                  data?.header?.light_logo
                }
              />
              <img
                className="dark-mode"
                alt="Travila"
                src={
                  process?.env?.NEXT_PUBLIC_STORAGE_URL +
                  data?.header?.dark_logo
                }
              />
            </Link>
            <div
              className="burger-icon burger-icon-white"
              onClick={handleMobileMenu}
            />
          </div>
          {data?.show_signin_button === 1 && (
            <div className="mobile-header-top">
              <div className="box-author-profile">
                <div className="card-author">
                  <div className="card-image">
                    {" "}
                    <img
                      src="/assets/imgs/page/homepage1/author2.png"
                      alt="Travila"
                    />
                  </div>
                  <div className="card-info">
                    <p className="text-md-bold neutral-1000">Alice Roses</p>
                    <p className="text-xs neutral-1000">London, England</p>
                  </div>
                </div>
                <Link className="btn btn-black" href="#">
                  Logout
                </Link>
              </div>
            </div>
          )}

          <div className="mobile-header-content-area">
            <div className="perfect-scroll">
              <div className="mobile-menu-wrap mobile-header-border">
                <nav>
                  <ul className="mobile-menu font-heading">
                    {data?.categories?.map((category: any, index: number) =>
                      category?.sub?.length === 0 ? (
                        <li key={index}>
                          <Link
                            href={
                              category?.link == null
                                ? category?.slug
                                : category?.link
                            }
                          >
                            {category?.category_name}
                          </Link>
                        </li>
                      ) : (
                        <li
                          key={index}
                          className={`has-children ${
                            isAccordion === index + 1 ? "active" : ""
                          }`}
                        >
                          <span
                            className="menu-expand"
                            onClick={() => handleAccordion(index + 1)}
                          >
                            <i className="arrow-small-down"></i>
                          </span>
                          <Link
                            className="active"
                            href={
                              category?.link === null
                                ? category?.slug
                                : category?.link
                            }
                          >
                            {category?.category_name}
                          </Link>
                          <ul
                            className="sub-menu"
                            style={{
                              display: `${
                                isAccordion == index + 1 ? "block" : "none"
                              }`,
                            }}
                          >
                            {category?.sub?.map((subCat: any, index: any) => (
                              <li key={index}>
                                <Link href={subCat?.link}>
                                  {subCat?.sub_category_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
}
