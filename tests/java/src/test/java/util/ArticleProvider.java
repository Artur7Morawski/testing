package util;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.junit.jupiter.params.provider.Arguments;

import java.io.InputStreamReader;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Stream;

public final class ArticleProvider {
    private static final Gson GSON = new Gson();

    private record Article(String slug, String title) {}

    public static Stream<Arguments> articleArguments() {
        Type listType = new TypeToken<List<Article>>() {}.getType();
        List<Article> articles;
        try (InputStreamReader reader = new InputStreamReader(ArticleProvider.class.getResourceAsStream("/wiki_articles.json"))) {
            articles = GSON.fromJson(reader, listType);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
        return articles.stream().map(a -> Arguments.of(a.slug, a.title));
    }

    public static Stream<Arguments> slugArguments() {
        return articleArguments().map(args -> Arguments.of(args.get()[0]));
    }

    private ArticleProvider() {}
} 