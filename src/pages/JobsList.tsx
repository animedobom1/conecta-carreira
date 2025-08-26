import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, Building, Clock, Search, Filter, 
  Briefcase, DollarSign, Calendar, Users,
  Star, Bookmark, Eye, ArrowUpDown,
  SlidersHorizontal, X
} from "lucide-react";
import { Link } from "react-router-dom";
import { getJobs, getCompany } from "@/lib/storage";
import { useSEO } from "@/hooks/useSEO";

const JobsList = () => {
  const allJobs = getJobs().filter((j) => j.status === "open");
  
  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useSEO({ 
    title: "Buscar Vagas | MX Vagas", 
    description: "Encontre as melhores oportunidades de emprego. Busque por cargo, empresa, localização e muito mais." 
  });

  // Extrair localizações únicas
  const uniqueLocations = useMemo(() => {
    const locations = new Set<string>();
    allJobs.forEach(job => {
      if (job.location) {
        locations.add(job.location);
      }
    });
    return Array.from(locations).sort();
  }, [allJobs]);

  // Extrair tipos únicos
  const uniqueTypes = useMemo(() => {
    const types = new Set<string>();
    allJobs.forEach(job => {
      if (job.type) {
        types.add(job.type);
      }
    });
    return Array.from(types).sort();
  }, [allJobs]);

  // Filtrar e ordenar vagas
  const filteredJobs = useMemo(() => {
    const filtered = allJobs.filter(job => {
      const company = getCompany(job.companyId);
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
      const matchesType = selectedType === "all" || job.type === selectedType;
      
      // Filtro de salário (simplificado para demo)
      const matchesSalary = selectedSalaryRange === "all" || true; // Implementar lógica específica conforme necessário

      return matchesSearch && matchesLocation && matchesType && matchesSalary;
    });

    // Ordenação
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [allJobs, searchTerm, selectedLocation, selectedType, selectedSalaryRange, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("all");
    setSelectedType("all");
    setSelectedSalaryRange("all");
    setSortBy("newest");
  };

  const hasActiveFilters = searchTerm || selectedLocation !== "all" || selectedType !== "all" || selectedSalaryRange !== "all" || sortBy !== "newest";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Header da página */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Encontre sua próxima oportunidade
          </h1>
          <p className="text-lg text-gray-600">
            {filteredJobs.length} vagas disponíveis
          </p>
        </div>

        {/* Barra de busca principal */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Campo de busca */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Buscar por cargo, empresa ou palavra-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
              </div>

              {/* Filtros rápidos */}
              <div className="flex gap-3">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-48 h-12">
                    <SelectValue placeholder="Localização" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as localizações</SelectItem>
                    {uniqueLocations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40 h-12">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    {uniqueTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-4"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {/* Filtros avançados (expansível) */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Faixa Salarial</Label>
                    <Select value={selectedSalaryRange} onValueChange={setSelectedSalaryRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as faixas</SelectItem>
                        <SelectItem value="1-3k">R$ 1.000 - R$ 3.000</SelectItem>
                        <SelectItem value="3-5k">R$ 3.000 - R$ 5.000</SelectItem>
                        <SelectItem value="5-8k">R$ 5.000 - R$ 8.000</SelectItem>
                        <SelectItem value="8k+">Acima de R$ 8.000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">Ordenar por</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Mais recentes</SelectItem>
                        <SelectItem value="oldest">Mais antigas</SelectItem>
                        <SelectItem value="title">Título (A-Z)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    {hasActiveFilters && (
                      <Button 
                        variant="ghost" 
                        onClick={clearFilters}
                        className="w-full"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Limpar Filtros
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Filtros ativos */}
        {hasActiveFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge variant="secondary" className="px-3 py-1">
                  Busca: "{searchTerm}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedLocation !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  Local: {selectedLocation}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0"
                    onClick={() => setSelectedLocation("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="px-3 py-1">
                  Tipo: {selectedType}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0"
                    onClick={() => setSelectedType("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Lista de vagas */}
        {filteredJobs.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhuma vaga encontrada
              </h3>
              <p className="text-gray-600 mb-4">
                {hasActiveFilters 
                  ? "Tente ajustar os filtros para ver mais resultados"
                  : "Não há vagas disponíveis no momento"
                }
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Limpar todos os filtros
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const company = getCompany(job.companyId);
              return (
                <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200 bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-900 line-clamp-2 leading-tight">
                      {job.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Building className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {company?.name || "Empresa"}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      
                      {job.salary && (
                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="text-sm font-medium">{job.salary}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                      {job.description}
                    </p>
                    
                    <Separator className="my-4" />
                    
                    <div className="flex gap-2">
                      <Link to={`/apply/${job.id}`} className="flex-1">
                        <Button className="w-full">
                          <Briefcase className="h-4 w-4 mr-2" />
                          Candidatar-se
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="px-3">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Estatísticas no final */}
        {filteredJobs.length > 0 && (
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {filteredJobs.length}
                  </div>
                  <div className="text-sm text-blue-700">
                    Vagas Disponíveis
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {new Set(filteredJobs.map(job => job.companyId)).size}
                  </div>
                  <div className="text-sm text-blue-700">
                    Empresas Parceiras
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {uniqueLocations.length}
                  </div>
                  <div className="text-sm text-blue-700">
                    Cidades Atendidas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default JobsList;
