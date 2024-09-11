import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function CardDefault({ imgSrc, characterName, btnText, status }) {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={imgSrc} alt={characterName} width="100%" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {characterName}
        </Typography>
        <Typography>Status: {status}</Typography>
      </CardBody>
      <CardFooter className="flex pt-0 justify-center">
        <Button>{btnText}</Button>
      </CardFooter>
    </Card>
  );
}
