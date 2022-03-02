import React, { useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const itemSearchParam = searchParams.get("item");
    if (itemSearchParam) {
      setSearch(itemSearchParam);
    }
  }, []);

  return (
    <InputGroup>
      <InputRightElement pointerEvents={"none"}>
        <SearchIcon color={"gray.500"} />
      </InputRightElement>
      <Input
        type={"search"}
        placeholder={"Search"}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && search !== "") {
            navigate(`/search?item=${search}`);
          }
        }}
      />
    </InputGroup>
  );
};
