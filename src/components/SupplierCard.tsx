import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Phone, MapPin } from "lucide-react";

export interface Supplier {
  name: string;
  price: number;
  rating: number;
  deliveryTime: string;
  contact?: string;
  location?: string;
}

interface SupplierCardProps {
  supplier: Supplier;
  item?: string;
}

export const SupplierCard = ({ supplier, item }: SupplierCardProps) => {
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "supplier-excellent";
    if (rating >= 4.0) return "supplier-good";
    return "supplier-average";
  };

  return (
    <Card className="p-4 mb-3 border-l-4 border-l-primary hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg">{supplier.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge 
              variant="secondary" 
              className={`bg-${getRatingColor(supplier.rating)} text-white`}
            >
              <Star className="w-3 h-3 mr-1 fill-current" />
              {supplier.rating}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {supplier.deliveryTime}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">₹{supplier.price}</div>
          <div className="text-sm text-muted-foreground">per kg</div>
        </div>
      </div>
      
      {(supplier.contact || supplier.location) && (
        <div className="space-y-2 mb-3">
          {supplier.contact && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              {supplier.contact}
            </div>
          )}
          {supplier.location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              {supplier.location}
            </div>
          )}
        </div>
      )}
      
      <Button 
        size="sm" 
        className="w-full bg-primary hover:bg-primary/90"
      >
        Contact Supplier
      </Button>
    </Card>
  );
};