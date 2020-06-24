import React from "react";
import { Card, CardContent } from "@material-ui/core";

const CardView = ({ children }) => {
  return (
    <Card className="card">
        <CardContent>
            {children}
        </CardContent>
    </Card>
  );
};

export default CardView;