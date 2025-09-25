import { useEffect, useState } from "react";
import { getUser, useGetUser } from "../services/user-service";

export function BookCard() {
  const data = useGetUser("12");

  return <div>{data?.name}</div>;
}
