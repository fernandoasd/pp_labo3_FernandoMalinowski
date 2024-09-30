class Vehiculo
{
    id = 0;
    modelo = "";
    anoFab = "1900";
    velMax = 0;

    constructor (p_id, p_modelo, p_anoFab, p_velMax)
    {
        this.id = p_id;
        this.modelo = p_modelo;
        this.anoFab = p_anoFab;
        this.velMax = p_velMax;
    }

    toString()
    {
        return "Id: " + this.id + ", Modelo: " + this.modelo + ", AnoFab: " + this.anoFab + ", VelMAx: " + this.velMax;
    }
}

class Aereo extends Vehiculo
{
    altMax = 0;
    autonomia = 0;

    constructor(p_id, p_modelo, p_anoFab, p_velMax, p_altMax, p_autonomia)
    {
        super(p_id, p_modelo, p_anoFab, p_velMax);
        this.altMax = p_altMax;
        this.autonomia = p_autonomia;
    }
}

class Terrestre extends Vehiculo
{
    cantPue = 0;
    cantRue = 0;

    constructor(p_id, p_modelo, p_anoFab, p_velMax, p_cantPue, p_cantRue)
    {
        super(p_id, p_modelo, p_anoFab, p_velMax);
        this.cantPue = p_cantPue;
        this.cantRue = p_cantRue;
    }

}



autos = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]';