
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function PromptDetailSkeleton() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-8 text-muted-foreground hover:text-foreground"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to library
      </Button>
      
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-36" />
      
      <div className="p-6 rounded-xl border bg-card mt-6">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-24 w-full" />
      </div>
      
      <div className="bg-accent rounded-xl p-6 border mt-6">
        <Skeleton className="h-5 w-48 mb-4" />
        <Skeleton className="h-20 w-full" />
      </div>
      
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  );
}
