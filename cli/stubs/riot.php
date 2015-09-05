<?php
    header("Content-Type: text/javascript; charset=utf-8");
    abstract class RiotAPI{

        protected $region;
        protected $endpoint;
        public function __construct($region){
            $this->region = strtolower($region);
            $this->endpoint = RiotAPI::$ENDPOINTS[$region];
        }

        protected static $APIKEY = "9e690716-4e4e-4b82-b17e-7a13269b96d3";
        public static $ENDPOINTS = array(
            'BR' => 'br.api.pvp.net',
            'EUNE' => 'eune.api.pvp.net',
            'EUW' => 'euw.api.pvp.net',
            'KR' => 'kr.api.pvp.net',
            'LAS' => 'las.api.pvp.net',
            'LAN' => 'lan.api.pvp.net',
            'NA' => 'na.api.pvp.net',
            'OCE' => 'oce.api.pvp.net',
            'TR' => 'tr.api.pvp.net',
            'RU' => 'ru.api.pvp.net',
            // 'Global' => 'global.api.pvp.net',
        );
        protected static $SERVICE = "/";

        public function request($type, $contents = array()){
            $url = "http://$this->endpoint/" . $this->buildServiceUrl() . $type . $this->buildUrlContents($contents);

            return file_get_contents($url, false, $this->buildContext());
        }
        public function request_argument($type, $needle, $replace, $contents = array()){
            $url = "http://$this->endpoint/" . $this->buildServiceUrl() . str_replace($needle, $replace, $type) . $this->buildUrlContents($contents);

            return file_get_contents($url, false, $this->buildContext());
        }

        protected function buildServiceUrl(){
            return self::$SERVICE;
        }
        protected function buildUrlContents($contents = array()){
            $contents['api_key'] = self::$APIKEY;
            return "?" . http_build_query($contents);
        }
        protected function buildContext(){
            $options = array(
                'http' => array(
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'GET',
                    'ignore_errors'  => true,
                ),
            );
            return stream_context_create($options);
        }

        public function parse($data){

        }
    }

    Class LeagueAPI extends RiotAPI{
        protected static $SERVICE = "api/lol/{region}/v2.5/league/";

        protected function buildServiceUrl(){
            return str_replace("{region}", $this->region, self::$SERVICE);
        }
    }

    Class SummonerAPI extends RiotAPI{
        protected static $SERVICE = "api/lol/{region}/v1.4/summoner/";

        protected function buildServiceUrl(){
            return str_replace("{region}", $this->region, self::$SERVICE);
        }
    }

    $summoner = new SummonerAPI("NA");
    $league = new LeagueAPI("NA");


    $name = strtolower(preg_replace("/[^A-Za-z0-9]/", "", $_REQUEST["summoner"]));

    $sum_obj = json_decode($summoner->request_argument("by-name/{summonerNames}", "{summonerNames}", $name));


    $rank = $_REQUEST["summoner"] . " was not found.";
    if ($sum_obj){
        $id = $sum_obj->$name->id;
        $data =  json_decode($league->request_argument("by-summoner/{summonerIds}/entry/", "{summonerIds}", $id));

        $rank = $sum_obj->$name->name . " is unranked.";
        if ($data){
            foreach($data->$id as $entry){
                if ($entry->queue == "RANKED_SOLO_5x5"){
                    $rank = "<a href='http://www.lolking.net/summoner/na/" . $sum_obj->$name->id . "'>" . $sum_obj->$name->name . "</a> is " . $entry->tier . " " . $entry->entries[0]->division . " (" . $entry->name . ") with " . $entry->entries[0]->leaguePoints . "LP and " . $entry->entries[0]->wins . " wins";
                    break;
                }
            }
        }
    }

    echo "response = \"$rank\";";
?>
