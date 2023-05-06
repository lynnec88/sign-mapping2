import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const Regional = () => {
  const { common_id } = useParams();
  const [region, setCommon] = useState([]);

  useEffect(() => {
    fetch(`/api/regional/${common_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: 'Hello world!',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCommon(data.data);
      });

    const loadMap = () => {
      const mapOptions = {
        center: { lat: 42.877742, lng: -97.380979 },
        zoom: 3.5
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      const westCoords = [
        { lat: 49.0090508, lng:	-123.31604},
                        { lat: 48.3854422, lng:	-123.1567383},
                        { lat: 48.239309, lng:	-123.5742188},
                        { lat: 48.4000325, lng:	-124.7607422},
                        { lat: 48.004625, lng:	-124.7607422},
                        { lat: 46.7248004, lng:	-124.0795898},
                        { lat: 45.6140374, lng:	-123.9697266},
                        { lat: 42.7470122, lng:	-124.6069336},
                        { lat: 40.413496, lng:	-124.4311523},
                        { lat: 39.656456, lng:	-124.0795898},
                        { lat: 38.4277735, lng:	-123.1787109},
                        { lat: 34.3434361, lng:	-120.6958008},
                        { lat: 33.5597066, lng:	-118.059082},
                        { lat: 32.5792206, lng:	-117.4768066},
                        { lat: 32.519026, lng:	-117.2296143},
                        { lat: 32.7318409, lng:	-114.5599365},
                        { lat: 32.99945, lng:	-114.4775391},
                        { lat: 32.99945, lng:	-114.6478271},
                        { lat: 33.2294981, lng:	-114.6862793},
                        { lat: 33.4176874, lng:	-114.6807861},
                        { lat: 33.6832109, lng:	-114.5050049},
                        { lat: 33.9980273, lng:	-114.4775391},
                        { lat: 34.2844533, lng:	-114.1149902},
                        { lat: 34.7054934, lng:	-114.4775391},
                        { lat: 34.8712851, lng:	-114.6327209},
                        { lat: 35.0696261, lng:	-114.6025085},
                        { lat: 35.096878, lng:	-114.6454239},
                        { lat: 35.1171003, lng:	-114.631691},
                        { lat: 35.1210318, lng:	-114.6062851},
                        { lat: 35.1715632, lng:	-114.5695496},
                        { lat: 35.2411328, lng:	-114.576416},
                        { lat: 35.5232852, lng:	-114.6697998},
                        { lat: 35.8656825, lng:	-114.6601868},
                        { lat: 36.0879507, lng:	-114.7521973},
                        { lat: 36.1134714, lng:	-114.6711731},
                        { lat: 36.1301108, lng:	-114.609375},
                        { lat: 36.1234555, lng:	-114.4487},
                        { lat: 36.1478557, lng:	-114.4184875},
                        { lat: 36.1389838, lng:	-114.3717957},
                        { lat: 36.0191145, lng:	-114.2578125},
                        { lat: 36.024668, lng:	-114.1452026},
                        { lat: 36.1478557, lng:	-114.0875244},
                        { lat: 36.1988499, lng:	-114.0463257},
                        { lat: 36.998714, lng:	-114.0504456},
                        { lat: 36.9937784, lng:	-102.0410156},
                        { lat: 40.996484, lng:	-102.052002},
                        { lat: 41.0037391, lng:	-104.0515137},
                        { lat: 48.994636, lng:	-104.0515137},
                        { lat: 49.0090508, lng:	-123.31604},
      ];

      const westPolygon = new window.google.maps.Polygon({
        paths: westCoords,
        strokeColor: 'orange',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'orange',
        fillOpacity: 0.35
      });

          // Create the infowindow with some text and image
          console.log('region:', region);
          console.log('region.west_url:', region.west_url);
          var infoWindow = new window.google.maps.InfoWindow({
            content: '<div><h3>This is the West region</h3><img src="/images/' + region.west_url + '" alt="Region Image"></div>',
          });
          
          
          

      // Add a mouseover event listener to the polygon to display the infowindow
      window.google.maps.event.addListener(westPolygon, 'mouseover', function (event) {
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });

      // Add a mouseout event listener to the polygon to close the infowindow
      window.google.maps.event.addListener(westPolygon, 'mouseout', function (event) {
        infoWindow.close();
      });


      const southwestCoords = [
        { lat: 36.9937784, lng:-102.0410156},
                { lat: 36.998714, lng:-114.0504456},
                { lat: 36.1988499, lng:-114.0463257},
                { lat: 36.1478557, lng:-114.0875244},
                { lat: 36.024668, lng:-114.1452026},
                { lat: 36.0191145, lng:-114.2578125},
                { lat: 36.1389838, lng:-114.3717957},
                { lat: 36.1478557, lng:-114.4184875},
                { lat: 36.1234555, lng:-114.4487},
                { lat: 36.1301108, lng:-114.609375},
                { lat: 36.1134714, lng:-114.6711731},
                { lat: 36.0879507, lng:-114.7521973},
                { lat: 35.8656825, lng:-114.6601868},
                { lat: 35.5232852, lng:-114.6697998},
                { lat: 35.2411328, lng:-114.576416},
                { lat: 35.1715632, lng:-114.5695496},
                { lat: 35.1210318, lng:-114.6062851},
                { lat: 35.1171003, lng:-114.631691},
                { lat: 35.096878, lng:-114.6454239},
                { lat: 35.0696261, lng:-114.6025085},
                { lat: 34.8712851, lng:-114.6327209},
                { lat: 34.7054934, lng:-114.4775391},
                { lat: 34.2844533, lng:-114.1149902},
                { lat: 33.9980273, lng:-114.4775391},
                { lat: 33.6832109, lng:-114.5050049},
                { lat: 33.4176874, lng:-114.6807861},
                { lat: 33.2294981, lng:-114.6862793},
                { lat: 32.99945, lng:-114.6478271},
                { lat: 32.99945, lng:-114.4775391},
                { lat: 32.7318409, lng:-114.5599365},
                { lat: 32.472695, lng:-114.8181152},
                { lat: 31.297328, lng:-111.1047363},
                { lat: 31.2879399, lng:-108.215332},
                { lat: 31.7655374, lng:-108.215332},
                { lat: 31.7655374, lng:-106.5124512},
                { lat: 30.590637, lng:-104.9304199},
                { lat: 29.5639016, lng:-104.4799805},
                { lat: 28.9408618, lng:-103.0957031},
                { lat: 29.2384771, lng:-102.8649902},
                { lat: 29.7262223, lng:-102.7001953},
                { lat: 29.7357624, lng:-101.3708496},
                { lat: 27.5082714, lng:-99.5031738},
                { lat: 26.3623421, lng:-99.107666},
                { lat: 25.8196719, lng:-97.4157715},
                { lat: 25.9185262, lng:-96.932373},
                { lat: 27.1080338, lng:-97.1411133},
                { lat: 29.3055613, lng:-94.3066406},
                { lat: 29.4682966, lng:-93.7957764},
                { lat: 29.8263484, lng:-93.883667},
                { lat: 30.0738478, lng:-93.7408447},
                { lat: 30.4297296, lng:-93.7298584},
                { lat: 30.8833693, lng:-93.5211182},
                { lat: 31.5457714, lng:-93.7792969},
                { lat: 31.9941007, lng:-94.0374756},
                { lat: 33.564284, lng:-94.0319824},
                { lat: 33.628342, lng:-94.487915},
                { lat: 35.3666557, lng:-94.4110107},
                { lat: 36.5140512, lng:-94.6252441},
                { lat: 37.0025527, lng:-94.6142578},
                { lat: 36.9937784, lng:-102.0410156},
      ];

      const southwestPolygon = new window.google.maps.Polygon({
        paths: southwestCoords,
        strokeColor: 'yellow',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'yellow',
        fillOpacity: 0.35
      });

          // Create the infowindow with some text
      var infoWindow2 = new window.google.maps.InfoWindow({
        content: "This is the Southwest region",
      });

      // Add a mouseover event listener to the polygon to display the infowindow
      window.google.maps.event.addListener(southwestPolygon, 'mouseover', function (event) {
        infoWindow2.setPosition(event.latLng);
        infoWindow2.open(map);
      });

      // Add a mouseout event listener to the polygon to close the infowindow
      window.google.maps.event.addListener(southwestPolygon, 'mouseout', function (event) {
        infoWindow2.close();
      });


      const midwestCoords = [
        { lat:37.0200982, lng:-102.0629883},
        { lat:36.9937784, lng:-94.6307373},
        { lat:36.5140512, lng:-94.6142578},
        { lat:36.4831406, lng:-90.1428223},
        { lat:36.0002296, lng:-90.3625488},
        { lat:35.9957854, lng:-89.7033691},
        { lat:36.4831406, lng:-89.4891357},
        { lat:36.5096362, lng:-89.2089844},
        { lat:37.0200982, lng:-89.0991211},
        { lat:37.0727105, lng:-88.4619141},
        { lat:38.0307857, lng:-87.9125977},
        { lat:37.8575072, lng:-86.8579102},
        { lat:37.9441975, lng:-86.0009766},
        { lat:38.3071806, lng:-85.4516602},
        { lat:38.8397076, lng:-84.6166992},
        { lat:39.0575837, lng:-84.4848633},
        { lat:39.006379, lng:-84.309082},
        { lat:38.6125783, lng:-83.6608887},
        { lat:38.625454, lng:-83.2104492},
        { lat:38.7540833, lng:-83.034668},
        { lat:38.5610526, lng:-82.8039551},
        { lat:38.4277735, lng:-82.5897217},
        { lat:38.4191664, lng:-82.3260498},
        { lat:38.9978413, lng:-81.99646},
        { lat:38.8610976, lng:-81.8481445},
        { lat:38.9295024, lng:-81.7492676},
        { lat:39.0533181, lng:-81.7712402},
        { lat:39.4234642, lng:-81.3977051},
        { lat:39.338546, lng:-81.3482666},
        { lat:39.6226149, lng:-80.8703613},
        { lat:40.2627607, lng:-80.6286621},
        { lat:40.5972706, lng:-80.6286621},
        { lat:40.6264611, lng:-80.5187988},
        { lat:42.3098154, lng:-80.491333},
        { lat:42.2000383, lng:-81.2164307},
        { lat:41.6688086, lng:-82.3754883},
        { lat:41.664705, lng:-82.6611328},
        { lat:41.8695608, lng:-83.0895996},
        { lat:42.0044072, lng:-83.1280518},
        { lat:42.2000383, lng:-83.1170654},
        { lat:42.3869514, lng:-82.8424072},
        { lat:42.5490336, lng:-82.6281738},
        { lat:42.6501218, lng:-82.5073242},
        { lat:43.600284, lng:-82.0953369},
        { lat:45.2748864, lng:-82.4194336},
        { lat:45.767523, lng:-83.5180664},
        { lat:45.9816952, lng:-83.4082031},
        { lat:46.5437496, lng:-84.2651367},
        { lat:46.452997, lng:-84.5068359},
        { lat:46.8150986, lng:-84.8583984},
        { lat:48.2978125, lng:-88.3959961},
        { lat:48.0487099, lng:-89.1650391},
        { lat:47.9972739, lng:-89.9505615},
        { lat:48.122101, lng:-90.769043},
        { lat:48.2429674, lng:-90.8569336},
        { lat:48.0450376, lng:-91.3623047},
        { lat:48.3233867, lng:-92.043457},
        { lat:48.319734, lng:-92.2796631},
        { lat:48.2502835, lng:-92.2576904},
        { lat:48.2246726, lng:-92.3510742},
        { lat:48.4000325, lng:-92.444458},
        { lat:48.6147537, lng:-93.2958984},
        { lat:48.8068635, lng:-94.7021484},
        { lat:49.325122, lng:-94.8120117},
        { lat:49.3966751, lng:-95.1855469},
        { lat:49.0090508, lng:-95.1196289},
        { lat:48.9657938, lng:-104.0625},
        { lat:41.0296434, lng:-104.0405273},
        { lat:40.963308, lng:-102.0629883},
        { lat:37.0200982, lng:-102.0629883},
      ];

      const midwestPolygon = new window.google.maps.Polygon({
        paths: midwestCoords,
        strokeColor: 'red',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'red',
        fillOpacity: 0.35
      });

          // Create the infowindow with some text
      var infoWindow3 = new window.google.maps.InfoWindow({
        content: "This is the Midwest region",
      });

      // Add a mouseover event listener to the polygon to display the infowindow
      window.google.maps.event.addListener(midwestPolygon, 'mouseover', function (event) {
        infoWindow3.setPosition(event.latLng);
        infoWindow3.open(map);
      });

      // Add a mouseout event listener to the polygon to close the infowindow
      window.google.maps.event.addListener(midwestPolygon, 'mouseout', function (event) {
        infoWindow3.close();
      });


      const southCoords = [
        { lat:36.5140512, lng:-94.6142578},
        { lat:35.4159149, lng:-94.4274902},
        { lat:33.6420625, lng:-94.4714355},
        { lat:33.5505511, lng:-94.0539551},
        { lat:31.9894418, lng:-94.0429688},
        { lat:31.0905741, lng:-93.5266113},
        { lat:29.8215827, lng:-93.9001465},
        { lat:29.6021182, lng:-93.8012695},
        { lat:29.5065494, lng:-92.4169922},
        { lat:29.0753752, lng:-89.5715332},
        { lat:29.2959806, lng:-89.2089844},
        { lat:30.0976133, lng:-89.6154785},
        { lat:30.2780444, lng:-87.9016113},
        { lat:30.3065033, lng:-86.2536621},
        { lat:29.6880527, lng:-85.1000977},
        { lat:30.1261244, lng:-84.0563965},
        { lat:28.7869181, lng:-82.5402832},
        { lat:27.8973492, lng:-82.8039551},
        { lat:25.9876749, lng:-81.8591309},
        { lat:25.1552294, lng:-81.0791016},
        { lat:25.2943712, lng:-80.2001953},
        { lat:26.7259868, lng:-80.0134277},
        { lat:28.2366494, lng:-80.5078125},
        { lat:28.459033, lng:-80.5078125},
        { lat:30.4297296, lng:-81.4086914},
        { lat:32.0267063, lng:-80.7824707},
        { lat:33.1743416, lng:-79.1455078},
        { lat:33.6603531, lng:-78.8378906},
        { lat:33.760882, lng:-77.9699707},
        { lat:34.1436348, lng:-77.7722168},
        { lat:34.4975027, lng:-77.409668},
        { lat:34.5789524, lng:-76.5197754},
        { lat:35.1648275, lng:-75.4980469},
        { lat:35.6394411, lng:-75.4101563},
        { lat:36.5272948, lng:-75.8166504},
        { lat:37.0288694, lng:-75.8276367},
        { lat:38.7797814, lng:-75.0256348},
        { lat:39.5019215, lng:-75.5310059},
        { lat:39.8949872, lng:-75.0256348},
        { lat:40.0738681, lng:-75.300293},
        { lat:39.7135254, lng:-75.786438},
        { lat:39.7219761, lng:-80.5105591},
        { lat:40.3842128, lng:-80.5105591},
        { lat:40.3842128, lng:-80.5105591},
        { lat:40.6264611, lng:-80.5187988},
        { lat:40.5972706, lng:-80.6286621},
        { lat:40.2627607, lng:-80.6286621},
        { lat:39.6226149, lng:-80.8703613},
        { lat:39.338546, lng:-81.3482666},
        { lat:39.4234642, lng:-81.3977051},
        { lat:39.0533181, lng:-81.7712402},
        { lat:38.9295024, lng:-81.7492676},
        { lat:38.8610976, lng:-81.8481445},
        { lat:38.9978413, lng:-81.99646},
        { lat:38.4191664, lng:-82.3260498},
        { lat:38.4277735, lng:-82.5897217},
        { lat:38.5610526, lng:-82.8039551},
        { lat:38.7540833, lng:-83.034668},
        { lat:38.625454, lng:-83.2104492},
        { lat:38.6125783, lng:-83.6608887},
        { lat:39.006379, lng:-84.309082},
        { lat:39.0575837, lng:-84.4848633},
        { lat:38.8397076, lng:-84.6166992},
        { lat:38.3071806, lng:-85.4516602},
        { lat:37.9441975, lng:-86.0009766},
        { lat:37.8575072, lng:-86.8579102},
        { lat:38.0307857, lng:-87.9125977},
        { lat:37.0727105, lng:-88.4619141},
        { lat:37.0200982, lng:-89.0991211},
        { lat:36.5096362, lng:-89.2089844},
        { lat:36.4831406, lng:-89.4891357},
        { lat:35.9957854, lng:-89.7033691},
        { lat:36.0002296, lng:-90.3625488},
        { lat:36.4831406, lng:-90.1428223},
        { lat:36.5140512, lng:-94.6142578},
      ];

      const southPolygon = new window.google.maps.Polygon({
        paths: southCoords,
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35
      });

          // Create the infowindow with some text
      var infoWindow4 = new window.google.maps.InfoWindow({
        content: "This is the South region",
      });

      // Add a mouseover event listener to the polygon to display the infowindow
      window.google.maps.event.addListener(southPolygon, 'mouseover', function (event) {
        infoWindow4.setPosition(event.latLng);
        infoWindow4.open(map);
      });

      // Add a mouseout event listener to the polygon to close the infowindow
      window.google.maps.event.addListener(southPolygon, 'mouseout', function (event) {
        infoWindow4.close();
      });

      const northeastCoords = [
        {lat: 38.7797814, lng:-75.0256348},
        {lat: 39.5019215, lng:-75.5310059},
        {lat: 39.8949872, lng:-75.0256348},
        {lat: 40.0738681, lng:-75.300293},
        {lat: 39.7135254, lng:-75.786438},
        {lat: 39.7219761, lng:-80.5105591},
        {lat: 40.3842128, lng:-80.5105591},
        {lat: 40.3842128, lng:-80.5105591},
        {lat: 40.6264611, lng:-80.5187988},
        {lat: 42.305753, lng:-80.5297852},
        {lat: 42.500453, lng:-79.7607422},
        {lat: 42.8437513, lng:-78.9312744},
        {lat: 43.1049936, lng:-79.0740967},
        {lat: 43.4329771, lng:-79.1949463},
        {lat: 43.6320994, lng:-78.6950684},
        {lat: 43.6400506, lng:-76.7944336},
        {lat: 44.2018972, lng:-76.3549805},
        {lat: 45.007535, lng:-74.8388672},
        {lat: 45.015302, lng:-71.5319824},
        {lat: 45.2439534, lng:-71.3891602},
        {lat: 45.3675844, lng:-70.9057617},
        {lat: 45.3058026, lng:-70.8837891},
        {lat: 45.8747122, lng:-70.2685547},
        {lat: 47.4280873, lng:-69.2578125},
        {lat: 47.1000447, lng:-67.8076172},
        {lat: 45.5679096, lng:-67.7856445},
        {lat: 45.5679096, lng:-67.434082},
        {lat: 45.1510533, lng:-67.3461914},
        {lat: 44.7935309, lng:-66.9067383},
        {lat: 43.9295499, lng:-68.269043},
        {lat: 43.5803909, lng:-70.0268555},
        {lat: 42.7147322, lng:-70.7739258},
        {lat: 42.2285174, lng:-70.6860352},
        {lat: 42.0819167, lng:-69.9609375},
        {lat: 41.2117215, lng:-69.9169922},
        {lat: 41.0793511, lng:-71.6967773},
        {lat: 40.4970924, lng:-73.8720703},
        {lat: 39.6056882, lng:-73.894043},
        {lat: 38.7840635, lng:-75.0311279},
      ];

      const northeastPolygon = new window.google.maps.Polygon({
        paths: northeastCoords,
        strokeColor: 'blue',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'blue',
        fillOpacity: 0.35
      });

          // Create the infowindow with some text
      var infoWindow6 = new window.google.maps.InfoWindow({
        content: "This is the Northeast region",
      });

      // Add a mouseover event listener to the polygon to display the infowindow
      window.google.maps.event.addListener(northeastPolygon, 'mouseover', function (event) {
        infoWindow6.setPosition(event.latLng);
        infoWindow6.open(map);
      });

      // Add a mouseout event listener to the polygon to close the infowindow
      window.google.maps.event.addListener(northeastPolygon, 'mouseout', function (event) {
        infoWindow6.close();
      });

      westPolygon.setMap(map);
      southwestPolygon.setMap(map);
      midwestPolygon.setMap(map);
      southPolygon.setMap(map);
      northeastPolygon.setMap(map);
      
    };

    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      window.initMap = loadMap;
    } else {
      loadMap();
    }
  }, [common_id]); 

  return (
    <div className="container mt-3" style={{ fontSize: '20px' }}>
      <section className="row featurette">
        <div className="col-md-7 align-self-center p-lg-5">
          <h2
            className="featurette-heading lh-1 fw-bolder"
            style={{ fontSize: '30px' }}
          >
            Regional Signs
          </h2>
          <div id="map" style={{ height: '500px', width: '100%' }}></div>
        </div>
        <div className="col-md-5 align-self-center p-lg-5">
          <h2
            className="featurette-heading lh-1 fw-bolder"
            style={{ fontSize: '30px' }}
          >
            Common Sign
          </h2>
          <img
            className="bd-placeholder-img card-img-top m-auto"
            src={'/' + region.common_url}
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default Regional;
