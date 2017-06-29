<?php 

class ArticlesModel extends Model 
{

    public function getArticles($params)
    {
        if (!isset($params['lang'])) {
            $lang = DEFAULT_LANG;
        } else {
            $lang = $this->validateLang($params['lang']);
        }

        if (!isset($articlesOnPage)) {
            $articlesOnPage = DEFAULT_ARTICLES_ON_PAGE;
        }

        try {
            $sql = "SELECT * 
                        FROM articles a, articles_data d
                        WHERE d.pid = a.id 
                            AND lang = :lang

                        ORDER BY a.date_added DESC
                        LIMIT :articlesOnPage
                    ";

            $stmt = $this->db->prepare($sql);
            $stmt->bindValue(':lang', $lang);
            $stmt->bindValue(':articlesOnPage', (int) $articlesOnPage, PDO::PARAM_INT);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;

        } catch(PDOException $e) {
            return $e;
        } 
    }


    private function validateLang($lang) 
    {
        switch ($lang) {
            case 'en':
                return 'en';
                break;
            case 'de':
                return 'de';
                break;
            case 'es':
                return 'es';
                break;
            case 'ru':
                return 'ru';
                break;
            
            default:
                return 'en';
                break;
        }
    }
}