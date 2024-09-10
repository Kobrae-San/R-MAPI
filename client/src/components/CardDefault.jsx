import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CardDefault({
  imgSrc,
  characterName,
  species,
  gender,
  origin,
  location,
  btnText,
}) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={imgSrc} alt={characterName} width="100%" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {characterName}
        </Typography>
        <Typography>
          {characterName} is an {species} {gender != "unknown" ? gender : ""}{" "}
          {origin != "unknown" ? "from " + origin : ""}{" "}
          {location != "unknown" ? "currently located at " + location : ""}
        </Typography>
      </CardBody>
      <CardFooter className="flex pt-0 justify-center">
        <Button>{btnText}</Button>
      </CardFooter>
    </Card>
  );
}
