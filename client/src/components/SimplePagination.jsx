import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { nextPage, prevPage } from "../redux/paginationSlice";

export function SimplePagination() {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.pagination.activePage);
  const totalPages = useSelector((state) => state.pagination.totalPages);

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => dispatch(prevPage())}
        disabled={activePage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{activePage}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => dispatch(nextPage())}
        disabled={activePage === totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
