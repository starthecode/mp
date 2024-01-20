import React from 'react';

export default function SearchBarContainer() {
  return (
    <>
      <section className="flex w-full justify-center items-center mt-10">
        <form
          className="flex w-auto bg-white shadow rounded-lg justify-center items-center px-5 py-4"
          role="search"
          method="get"
          action="#"
        >
          <div className="">
            <input
              type="search"
              placeholder="Search for products"
              name="s"
              value=""
            />
          </div>
          <div className="select_mate" data-mate-select="active">
            <select name="">
              <option value="">All Categories </option>
              <option value="1">Select option 1</option>
              <option value="2">Select option 2</option>
              <option value="3">Select option 3</option>
            </select>
          </div>
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </section>
    </>
  );
}
