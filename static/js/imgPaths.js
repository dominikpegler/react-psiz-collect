"use strict";

var imgPaths = ["assets/img/I_Andesite_1_120.png", "assets/img/I_Andesite_2_120.png", "assets/img/I_Andesite_3_120.png", "assets/img/I_Andesite_4_120.png", "assets/img/I_Basalt_1_120.png", "assets/img/I_Basalt_2_120.png", "assets/img/I_Basalt_3_120.png", "assets/img/I_Basalt_4_120.png", "assets/img/I_Diorite_1_120.png", "assets/img/I_Diorite_2_120.png", "assets/img/I_Diorite_3_120.png", "assets/img/I_Diorite_4_120.png", "assets/img/I_Gabbro_1_120.png", "assets/img/I_Gabbro_2_120.png", "assets/img/I_Gabbro_3_120.png", "assets/img/I_Gabbro_4_120.png", "assets/img/I_Granite_1_120.png", "assets/img/I_Granite_2_120.png", "assets/img/I_Granite_3_120.png", "assets/img/I_Granite_4_120.png", "assets/img/I_Obsidian_1_120.png", "assets/img/I_Obsidian_2_120.png", "assets/img/I_Obsidian_3_120.png", "assets/img/I_Obsidian_4_120.png", "assets/img/I_Pegmatite_1_120.png", "assets/img/I_Pegmatite_2_120.png", "assets/img/I_Pegmatite_3_120.png", "assets/img/I_Pegmatite_4_120.png", "assets/img/I_Peridotite_1_120.png", "assets/img/I_Peridotite_2_120.png", "assets/img/I_Peridotite_3_120.png", "assets/img/I_Peridotite_4_120.png", "assets/img/I_Pumice_1_120.png", "assets/img/I_Pumice_2_120.png", "assets/img/I_Pumice_3_120.png", "assets/img/I_Pumice_4_120.png", "assets/img/I_Rhyolite_1_120.png", "assets/img/I_Rhyolite_2_120.png", "assets/img/I_Rhyolite_3_120.png", "assets/img/I_Rhyolite_4_120.png", "assets/img/M_Amphibolite_1_120.png", "assets/img/M_Amphibolite_2_120.png", "assets/img/M_Amphibolite_3_120.png", "assets/img/M_Amphibolite_4_120.png", "assets/img/M_Anthracite_1_120.png", "assets/img/M_Anthracite_2_120.png", "assets/img/M_Anthracite_3_120.png", "assets/img/M_Anthracite_4_120.png", "assets/img/M_Gneiss_1_120.png", "assets/img/M_Gneiss_2_120.png", "assets/img/M_Gneiss_3_120.png", "assets/img/M_Gneiss_4_120.png", "assets/img/M_Hornfels_1_120.png", "assets/img/M_Hornfels_2_120.png", "assets/img/M_Hornfels_3_120.png", "assets/img/M_Hornfels_4_120.png", "assets/img/M_Marble_1_120.png", "assets/img/M_Marble_2_120.png", "assets/img/M_Marble_3_1201.png", "assets/img/M_Marble_4_120.png", "assets/img/M_Migmatite_1_120.png", "assets/img/M_Migmatite_2_120.png", "assets/img/M_Migmatite_3_120.png", "assets/img/M_Migmatite_4_120.png", "assets/img/M_Phyllite_1_120.png", "assets/img/M_Phyllite_2_120.png", "assets/img/M_Phyllite_3_120.png", "assets/img/M_Phyllite_4_120.png", "assets/img/M_Quartzite_1_120.png", "assets/img/M_Quartzite_2_120.png", "assets/img/M_Quartzite_3_120.png", "assets/img/M_Quartzite_4_120.png", "assets/img/M_Schist_1_120.png", "assets/img/M_Schist_2_120.png", "assets/img/M_Schist_3_120.png", "assets/img/M_Schist_4_120.png", "assets/img/M_Slate_1_120.png", "assets/img/M_Slate_2_120.png", "assets/img/M_Slate_3_120.png", "assets/img/M_Slate_4_120.png", "assets/img/S_Bituminous_Coal_1_120.png", "assets/img/S_Bituminous_Coal_2_120.png", "assets/img/S_Bituminous_Coal_3_120.png", "assets/img/S_Bituminous_Coal_4_120.png", "assets/img/S_Breccia_1_120.png", "assets/img/S_Breccia_2_120.png", "assets/img/S_Breccia_3_120.png", "assets/img/S_Breccia_4_120.png", "assets/img/S_Chert_1_120.png", "assets/img/S_Chert_2_120.png", "assets/img/S_Chert_3_120.png", "assets/img/S_Chert_4_120.png", "assets/img/S_Conglomerate_1_120.png", "assets/img/S_Conglomerate_2_120.png", "assets/img/S_Conglomerate_3_120.png", "assets/img/S_Conglomerate_4_120.png", "assets/img/S_Dolomite_1_120.png", "assets/img/S_Dolomite_2_120.png", "assets/img/S_Dolomite_3_120.png", "assets/img/S_Dolomite_4_120.png", "assets/img/S_Micrite_1_120.png", "assets/img/S_Micrite_2_120.png", "assets/img/S_Micrite_3_120.png", "assets/img/S_Micrite_4_120.png", "assets/img/S_Rock_Gypsum_1_120.png", "assets/img/S_Rock_Gypsum_2_120.png", "assets/img/S_Rock_Gypsum_3_120.png", "assets/img/S_Rock_Gypsum_4_120.png", "assets/img/S_Rock_Salt_1_120.png", "assets/img/S_Rock_Salt_2_120.png", "assets/img/S_Rock_Salt_3_120.png", "assets/img/S_Rock_Salt_4_120.png", "assets/img/S_Sandstone_1_120.png", "assets/img/S_Sandstone_2_120.png", "assets/img/S_Sandstone_3_120.png", "assets/img/S_Sandstone_4_120.png", "assets/img/S_Shale_1_120.png", "assets/img/S_Shale_2_120.png", "assets/img/S_Shale_3_120.png", "assets/img/S_Shale_4_120.png"];